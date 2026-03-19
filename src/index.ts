import TelegramBot from 'node-telegram-bot-api';
import type { Message } from 'node-telegram-bot-api';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Task } from './entity/Task';
import { Repository } from 'typeorm';

const token = '8672001788:AAFfchuzjilMUe5IKMINYIVh9c8uDylForc';

const bot = new TelegramBot(token, { polling: true });

let taskRepository: Repository<Task> | null = null;

async function initializeDatabase() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected successfully');
        taskRepository = AppDataSource.getRepository(Task);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

initializeDatabase();

bot.onText(/\/start/, (msg: Message) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Getting started console logs!', {
        reply_markup: {
            inline_keyboard: [[{ text: 'Неявное приведение типов', callback_data: 'types' }]],
        },
    });
});

bot.on('message', async (msg: Message) => {
    const chatId = msg.chat.id;

    if (!taskRepository) {
        bot.sendMessage(chatId, 'Database is not connected. Please try again later.');
        return;
    }

    try {
        const task = await taskRepository.findOneBy({ id: 2 });

        if (msg.text && !msg.text.startsWith('/')) {
            const text = `\`\`\`javascript\n${task?.task ?? ''}\`\`\``;

            bot.sendMessage(chatId, text, {
                parse_mode: 'MarkdownV2',
                reply_markup: {
                    remove_keyboard: true,
                },
            });
        }
    } catch (e) {}
});
