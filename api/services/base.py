"""
Base service class for all services
"""
from typing import Optional, Dict, Any
from abc import ABC, abstractmethod


class BaseService(ABC):
    """Base class for all services"""
    
    def __init__(self, config: Optional[Dict[str, Any]] = None):
        self.config = config or {}
        self._initialize()
    
    def _initialize(self):
        """Initialize service - override in subclasses"""
        pass
    
    @abstractmethod
    async def execute(self, *args, **kwargs):
        """Execute service logic - must be implemented by subclasses"""
        pass
    
    def get_status(self) -> Dict[str, Any]:
        """Get service status"""
        return {
            "service": self.__class__.__name__,
            "status": "active",
            "config": self.config
        }
