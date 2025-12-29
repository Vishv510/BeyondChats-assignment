from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ArticleSchema(BaseModel):
    title: str
    original_content: str
    source_url: str
    # These will be null until Phase 2
    optimized_content: Optional[str] = None
    references: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)