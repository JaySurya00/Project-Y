from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class Post(BaseModel):
    user_id: str
    body: str
    media_file_url: Optional[str]=None
    created_at: datetime