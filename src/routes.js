const express = require('express');
const router = express.Router();
const { uuid, isUuid } = require('uuidv4');

const repositories = [
	{
		id: '4060c740-b5c2-465a-8986-65843310f5bb',
		title: 'Desafio Node.js',
		url: 'http://github.com/...',
		techs: ['Node.js', '...'],
		likes: 0,
	},
	{
		id: '0083da8d-9281-45ea-a682-7e949b96e03a',
		title: 'Desafio React.js',
		url: 'http://github.com/...',
		techs: ['React.js', 'Context API', 'Semantic UI'],
		likes: 0,
	},
	{
		id: '48072617-2320-41fe-b1bf-9a215963d76a',
		title: 'Desafio React Native',
		url: 'http://github.com/...',
		techs: ['React Native', 'Android Studio'],
		likes: 0,
	},
];

router.get('/repositories', (request, response) => {
	return response.json(repositories);
});

router.post('/repositories', (request, response) => {
	const { title, url, techs } = request.body;

	let newProject = { id: uuid(), title, url, techs, likes: 0 };
	repositories.push(newProject);

	return response.json(newProject);
});

router.put('/repositories/:id', (request, response) => {
	const { id } = request.params;
	const { title, url, techs } = request.body;
	const index = repositories.findIndex(repository => repository.id === id);

	if (index < 0) {
		throw new Error('Repository not found');
	}

	repositories[index] = {
		...repositories[index],
		title: title ? title : repositories[index].title,
		url: url ? url : repositories[index].url,
		techs: techs ? techs : repositories[index].techs,
	};

	return response.json(repositories[index]);
});

router.delete('/repositories/:id', (request, response) => {
	const { id } = request.params;

	const index = repositories.findIndex(repository => repository.id === id);

	if (index < 0) {
		throw new Error('Repository not found');
	}

	repositories.splice(index, 1);
	return response.status(204).send();
});

router.post('/repositories/:id/like', (request, response) => {
	const { id } = request.params;
	const index = repositories.findIndex(repository => repository.id === id);

	if (index < 0) {
		throw new Error('Repository not found');
	}
	repositories[index].likes++;

	return response.json(repositories[index]);
});

module.exports = router;
