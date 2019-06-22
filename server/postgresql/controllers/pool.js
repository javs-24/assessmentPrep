const { Pool } = require('pg');
const pool = new Pool({
  connectionString:
    'postgres://jzhdflks:V5l-IjqVYrLewLkKnqsb0GkVZypj1X6r@raja.db.elephantsql.com:5432/jzhdflks'
});

module.exports = pool;