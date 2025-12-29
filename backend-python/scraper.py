from time import time
import requests
from bs4 import BeautifulSoup

def get_oldest_articles():
    base_url = "https://beyondchats.com/blogs/"
    headers = {'User-Agent': 'Mozilla/5.0'}

    # Step 1: Find last page number
    res = requests.get(base_url, headers=headers)
    soup = BeautifulSoup(res.text, 'html.parser')

    pagination_nav = soup.find('nav', class_='ct-pagination', attrs={"data-pagination": "simple"})

    numbers = []

    links = pagination_nav.find_all('a', class_='page-numbers')
    for link in links:
        text = link.get_text().strip()
        if text.isdigit():
            numbers.append(int(text))
    last_page = max(numbers) if numbers else 1
    print(f"Detected last page: {last_page}")
    
    print(f"Current last page is: {last_page}") 
    # If you wanted to find the total pages to traverse back from:
    total_pages = int(last_page)

    print(total_pages)


    collected = []
    current_page = total_pages

    # Step 2: Traverse backward
    while current_page > 0 and len(collected) < 5:
        url = f"{base_url}page/{current_page}/" if current_page > 1 else base_url
        res = requests.get(url, headers=headers)
        soup = BeautifulSoup(res.text, 'html.parser')

        articles = soup.find_all('article')

        # Start from bottom (older first)
        for art in reversed(articles):
            if len(collected) >= 5:
                break
            title_tag = art.find('h2')
            link_tag = art.find('a')
                    
            if not title_tag or not link_tag:
                continue
                        
            title = title_tag.text.strip()
            link = link_tag['href']
                    
                    # Step 3: Go inside the article to get the full original content
            print(f"  -> Extracting content: {title}")
            try:
                art_res = requests.get(link, headers=headers)
                art_soup = BeautifulSoup(art_res.text, 'html.parser')
                
                # Selector 1: Title (The H1 in the blog post)
                blog_title_tag = art_soup.find('h1', class_='elementor-heading-title')
                blog_title = blog_title_tag.get_text(strip=True) if blog_title_tag else title
                
                # Selector 2: Content (The main blog body div)
                content_div = art_soup.find('div', class_='elementor-widget-theme-post-content')
                if content_div:
                    # separator="\n" keeps the paragraphs clean for the LLM later
                    content = content_div.get_text(separator="\n", strip=True)
                else:
                    content = "Content section not found."
                print(blog_title)

                collected.append({
                    "title": blog_title,
                    "source_url": link,
                    "original_content": content
                })
            except Exception as e:
                print(f"Error scraping article {link}: {e}")
                    
                    # Small delay to be polite to the server
                time.sleep(1)

            current_page -= 1

    return collected