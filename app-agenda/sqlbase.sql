CREATE TABLE aluno (
	id serial PRIMARY KEY,
	nome varchar(150),
	telefone varchar(14),
	email varchar(50),
	usuario varchar(100),
	senha varchar(100)
);

CREATE TABLE instituicao (
	id serial PRIMARY KEY,
	nome varchar(150),
	sigla varchar(20),
	cep int,
	rua varchar(100),
	cidade varchar(100),
	estado varchar(100)
);

CREATE TABLE disciplina (
	id serial PRIMARY KEY,
	nome varchar(150),
	abreviacao varchar(5),
	docente varchar(150),
	anotacao varchar(300),
	idaluno int,
	idinst int,
	FOREIGN KEY (idaluno) REFERENCES aluno(id),
	FOREIGN KEY (idinst) REFERENCES instituicao(id)
);

CREATE TABLE nota (
	id serial PRIMARY KEY,
	descricao varchar(150),
	nota NUMERIC(3,2),
	iddisc int,
	FOREIGN KEY (iddisc) REFERENCES disciplina(id)
);

CREATE TABLE tarefa (
	id serial PRIMARY KEY,
	periodo timestamp,
	horaInicio time not null,
	horaFinal time not null,
	iddisc int,
	idaluno int,
	FOREIGN KEY (iddisc) REFERENCES disciplina(id),
	FOREIGN KEY (idaluno) REFERENCES aluno(id)
);

