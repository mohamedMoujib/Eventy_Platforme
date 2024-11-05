const paginate = async (model, req) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 2; // Default to limit of 10

    const skip = (page - 1) * limit;

    const data = await model.find().skip(skip).limit(limit);
    const total = await model.countDocuments();

    return {
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

module.exports = paginate;
