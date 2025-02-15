from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./org_chart.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    title = Column(String)
    manager_id = Column(Integer, nullable=True)

# Create tables
Base.metadata.create_all(bind=engine)

# Initialize with sample data
def init_db():
    db = SessionLocal()
    if not db.query(Employee).first():
        sample_data = [
            Employee(id=1, name="John", title="CEO", manager_id=None),
            Employee(id=2, name="Alice", title="Manager", manager_id=1),
            Employee(id=3, name="Bob", title="Developer", manager_id=2),
            Employee(id=4, name="Carol", title="Designer", manager_id=2),
        ]
        db.add_all(sample_data)
        db.commit()
    db.close()
