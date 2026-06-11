from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Text,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class UserQuery(Base):
    __tablename__ = "user_queries"

    id = Column(Integer, primary_key=True)
    query = Column(Text, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    analyses = relationship(
        "AnalysisResult",
        back_populates="query"
    )

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True)

    query_id = Column(
        Integer,
        ForeignKey("user_queries.id")
    )

    drug_name = Column(String)
    condition = Column(String)

    matched_records = Column(Integer)

    avg_score = Column(Float)
    min_score = Column(Float)
    max_score = Column(Float)
    std_score = Column(Float)

    summary = Column(Text)
    insight = Column(Text)
    llm_explanation = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    query = relationship(
        "UserQuery",
        back_populates="analyses"
    )

    records = relationship(
        "RetrievedRecord",
        back_populates="analysis"
    )

class RetrievedRecord(Base):
    __tablename__ = "retrieved_records"

    id = Column(Integer, primary_key=True)

    analysis_id = Column(
        Integer,
        ForeignKey("analysis_results.id")
    )

    dosage_amount = Column(String)
    side_effects = Column(Text)

    improvement_score = Column(Float)

    analysis = relationship(
        "AnalysisResult",
        back_populates="records"
    )