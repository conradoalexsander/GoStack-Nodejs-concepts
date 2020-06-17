import React from 'react';

import './styles.css';
import { useState, useEffect } from 'react';
import api from './services/api';

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('repositories').then(response => setRepositories(response.data));
	}, []);

	async function handleAddRepository() {
		const response = await api.post('repositories', {
			title: `Desafio ${Date.now()}`,
			url: 'http://github.com/nodejs',
			techs: "['Node.js', 'ReactJs', 'React Native']",
		});

		if (response.status === 200) {
			const repository = response.data;
			setRepositories([...repositories, repository]);
		} else {
			console.log(response);
		}
	}

	async function handleRemoveRepository(id) {
		const response = await api.delete(`repositories/${id}`);

		if (response.status === 204) {
			setRepositories(repositories.filter(repository => repository.id !== id));
		}
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map(repository => {
					const { title, id } = repository;
					return (
						<li key={id}>
							{title}
							<button onClick={() => handleRemoveRepository(id)}>
								Remover
							</button>
						</li>
					);
				})}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
