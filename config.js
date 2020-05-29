//exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/studentsdb';
module.exports = {
    DATABASE_URL : process.env.DATABASE_URL || 'mongodb://localhost/finalprojectdb',
    API_TOKEN : process.env.API_TOKEN || '2abbf7c3-245b-404f-9473-ade729ed4653',
    PORT : process.env.PORT || '8080',
    SECRET_TOKEN : process.env.SECRET_TOKEN || 'secret',
}
