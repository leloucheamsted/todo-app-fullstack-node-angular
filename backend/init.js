const db = require('./models');
const Category = db.Category;
const Tag = db.Tag;

async function Init() {
    try {
        await db.sequelize.sync();

        const categoryCount = await Category.count();
        if (categoryCount === 0) {
            await Category.bulkCreate([
                { name: 'Personal' },
                { name: 'Work' },
                { name: 'Others' }
            ]);
        } else {
        }

        const tagCount = await Tag.count();
        if (tagCount === 0) {
            await Tag.bulkCreate([
                { name: 'Tag 1' },
                { name: 'Tag 2' }
            ]);
        } else {
        }

    } catch (err) {
        console.error(err);
    }
}

Init();
