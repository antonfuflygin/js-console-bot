import TelegramBot from 'node-telegram-bot-api';
import type { Message } from 'node-telegram-bot-api';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Task } from './entities/Task';
import { Repository } from 'typeorm';
import { User } from './entities/User';

const token = process.env.TELEGRAM_BOT_TOKEN || '';

const bot = new TelegramBot(token, { polling: true });

let taskRepository: Repository<Task> | null = null;
let userRepository: Repository<User> | null = null;

async function initializeDatabase() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected successfully');

        taskRepository = AppDataSource.getRepository(Task);
        userRepository = AppDataSource.getRepository(User);
    } catch (error) {
        console.error('Database connection failed:', error);

        process.exit(1);
    }
}

initializeDatabase();

bot.onText(/\/start/, (msg: Message) => {
    const chatId = msg.chat.id;

    if (!userRepository) {
        bot.sendMessage(chatId, 'Database is not connected. Please try again later.');
        return;
    }

    try {
        const user = userRepository.findOneBy({ username: msg.from?.username || 'Unknown' });

        if (!user) {
            const newUser = userRepository.create({ username: msg.from?.username || 'Unknown' });
            userRepository.save(newUser);
        }
    } catch (e) {
        console.error('Error saving user:', e);
        bot.sendMessage(chatId, 'При сохранении пользователя произошла ошибка. Пожалуйста, повторите попытку позже.');
        return;
    }

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
        const taskCount = await taskRepository.count();
        console.log(taskCount);
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
    } catch (e) {
        console.error('Error fetching tasks:', e);
        bot.sendMessage(chatId, 'При выборе задач произошла ошибка. Пожалуйста, повторите попытку позже.');
    }
});
