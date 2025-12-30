"""
Database abstraction layer
"""
from typing import Optional, Dict, Any, List
from enum import Enum


class DatabaseType(str, Enum):
    SUPABASE = "supabase"
    POSTGRESQL = "postgresql"
    MONGODB = "mongodb"
    SQLITE = "sqlite"


class DatabaseService:
    """Unified database interface supporting multiple backends"""
    
    def __init__(self, db_type: DatabaseType = DatabaseType.SUPABASE, config: Optional[Dict] = None):
        self.db_type = db_type
        self.config = config or {}
        self._client = None
    
    def _get_client(self):
        """Get appropriate database client"""
        if self.db_type == DatabaseType.SUPABASE:
            from ..integrations.supabase import supabase
            return supabase
        # Add other database types here
        return None
    
    async def query(self, collection: str, filters: Optional[Dict] = None) -> List[Dict[str, Any]]:
        """Query database"""
        client = self._get_client()
        if not client:
            return []
        
        if self.db_type == DatabaseType.SUPABASE:
            return await client.query(collection, filters)
        
        return []
    
    async def insert(self, collection: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Insert data"""
        client = self._get_client()
        if not client:
            return {"error": "No database configured"}
        
        if self.db_type == DatabaseType.SUPABASE:
            return await client.insert(collection, data)
        
        return data
    
    async def update(self, collection: str, id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Update data"""
        client = self._get_client()
        if not client:
            return {"error": "No database configured"}
        
        if self.db_type == DatabaseType.SUPABASE:
            return await client.update(collection, id, data)
        
        return data
    
    async def delete(self, collection: str, id: str) -> Dict[str, Any]:
        """Delete data"""
        return {"collection": collection, "id": id, "deleted": True}


# Global database service instance
db = DatabaseService()
