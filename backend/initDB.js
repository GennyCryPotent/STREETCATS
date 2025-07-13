import database from './models/database.js';

export async function populateDatabase() {
  try {
    // Recupero dei modelli
    const { User, Post, Comment } = database.models;

    // Inserimento utenti
    const alice = await User.create({ username: 'Alice', age: 30, password: 'password123' });
    const bob = await User.create({ username: 'Bob', age: 25, password: 'password456' });

    // Inserimento post
    const post1 = await Post.create({
      title: 'Primo avvistamento',
      description: 'Ho visto un gatto nero vicino al parco.',
      userId: alice.id,
      gender: 'maschio',
      image: 'img/cat1.jpg',
      latitude: 45.4642,
      longitude: 9.19
    });

    const post2 = await Post.create({
      title: 'Gatta bianca',
      description: 'Gatta molto dolce in cerca di casa.',
      userId: bob.id,
      gender: 'femmina',
      image: 'img/cat2.jpg',
      latitude: 45.4654,
      longitude: 9.185
    });

    // Inserimento commenti
    await Comment.create({
      text: 'Anche io l\'ho vista!',
      userId: bob.id,
      postId: post1.id
    });

    await Comment.create({
      text: 'Che bella!',
      userId: alice.id,
      postId: post2.id
    });

    // Query per stampare i dati
    const users = await User.findAll();
    for (const u of users) {
      console.log(`User: ${u.username}, Age: ${u.age}`);
    }

    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });
    for (const p of posts) {
      console.log(`Post: ${p.title}, Description: ${p.description}, Username: ${p.User.username}`);
    }

    const comments = await Comment.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });
    for (const c of comments) {
      console.log(`Comment: ${c.text}, Username: ${c.User.username}, Post ID: ${c.postId}`);
    }

    console.log('Dati iniziali inseriti correttamente.');
  } catch (error) {
    console.error('Errore durante il popolamento del database:', error);
    throw error;
  }
}