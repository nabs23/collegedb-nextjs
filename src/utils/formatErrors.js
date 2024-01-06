export default function formatErrors(error) {
    const mongooseErrors = {};
    for (let key in error.errors) {
        mongooseErrors[key] = error.errors[key].message;
    }
    return mongooseErrors;
}