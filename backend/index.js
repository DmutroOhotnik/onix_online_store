const express = require('express')
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const {join} = require("path");

const PORT = process.env.PORT || 3001

const app = express()
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

const productsFilePath = join(__dirname, 'data', 'products.json');
const usersFilePath = join(__dirname, 'data', 'users.json');
const ordersFilePath = join(__dirname, 'data', 'orders.json');

readFile = (filePath, req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Помилка зчитування файлу JSON:', err);
            res.status(500).send('Помилка сервера');
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error('Помилка парсингу JSON:', parseError);
            res.status(500).send('Помилка сервера');
        }
    });
}

addData = (filePath, value, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Помилка при читанні файлу:', err);
            return res.status(500).send('Помилка сервера');
        }

        const users = JSON.parse(data);

        users.push(value);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Помилка при записі файлу:', err);
                return res.status(500).send('Помилка сервера');
            }

            console.log('Користувача успішно додано до файлу.');
            res.status(200).send('Користувача успішно додано до файлу.');
        });
    });
}

app.get("/Data/products", (req, res) => {
    readFile(productsFilePath, req, res)
});

app.get("/Data/users", (req, res) => {
    readFile(usersFilePath, req, res)
});

app.get("/Data/orders", (req, res) => {
    readFile(ordersFilePath, req, res)
})

app.post("/Data/createUser", (req, res) => {
    addData(usersFilePath, req.body, res)

    console.log(req.body)
});

app.post("/Data/createOrder", (req, res) => {
    addData(ordersFilePath, req.body, res)

    console.log(req.body)
});

const storage = multer.diskStorage({
    destination: join(__dirname, '../public/public/UsersImages'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg';
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({storage: storage});

app.post('/uploadImage', upload.single('file'), (req, res) => {
    const imageUrl = req.file.filename;
    res.json({imageUrl});
});

app.put('/Data/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Помилка при зчитуванні файлу JSON:', err);
            res.status(500).send('Помилка сервера');
            return;
        }

        let users = JSON.parse(data);
        const userToUpdate = users.find((user) => user.id === parseInt(userId));

        if (!userToUpdate) {
            res.status(404).send('Користувача не знайдено');
            return;
        }

        userToUpdate.profileImage = updatedUserData.profileImage;

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Помилка при записі файлу JSON:', err);
                res.status(500).send('Помилка сервера');
                return;
            }

            res.json(userToUpdate); // Відправте оновлені дані назад на клієнтську сторону
        });
    });
});

app.delete("/deleteImage/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = join(__dirname, '../public/public/UsersImages/', imageName);

    if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Помилка при видаленні файлу:', err);
                res.status(500).send('Помилка при видаленні файлу');
            } else {
                console.log('Картинку видалено успішно');
                res.status(200).send('Картинку видалено успішно');
            }
        });
    } else {
        res.status(404).send('Файл не знайдено');
    }
});