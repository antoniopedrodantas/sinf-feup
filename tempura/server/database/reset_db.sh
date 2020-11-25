rm -f database/tempura.db
sqlite3 -init database/tempura.sql database/tempura.db ".read database/populate.sql"