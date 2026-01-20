// Простой HTTP-сервер на Node.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Порт для сервера
const PORT = 8080;

// MIME-типы для разных файлов
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
};

// Создаем сервер
const server = http.createServer((req, res) => {
    console.log(`Запрос: ${req.method} ${req.url}`);

    // Определяем путь к файлу
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Получаем расширение файла
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Читаем и отправляем файл
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Файл не найден
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - Страница не найдена</h1>', 'utf-8');
            } else {
                // Другая ошибка сервера
                res.writeHead(500);
                res.end(`Ошибка сервера: ${error.code}`, 'utf-8');
            }
        } else {
            // Успешно отправляем файл
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Запускаем сервер
server.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Сервер запущен!`);
    console.log(`📍 Адрес: http://localhost:${PORT}`);
    console.log(`⏹️  Для остановки нажмите Ctrl+C`);
    console.log('='.repeat(50));
});
