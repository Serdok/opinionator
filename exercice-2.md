# Developpement de nouvelle technologies - Blockchain

## Exercice 1

C'est [ce](README.md) repository :^)

## Exercice 2

### C’est quoi Solidity ?

C'est un langage orienté objet fortement typé (comme le C++) utilisé pour développer des contrats intelligents (smart contracts) 

### Quelle est la dernière version stable du compilateur ?

`solc 0.8.16+commit.07a7930e` à la date du 6 septembre 2022

### Qu’est-ce qu’un smart contract ? ET comment fonctionne t’il?



### Quels sont les outils utilisés pour développer un smart contract?

  - En cloud: un IDE `remix.ethereum.org`, l'extension MetaMask sur le navigateur avec un compte MetaMask connecté de préférence sur un réseau test Ethereum
  - En local: un compilateur `solc` installé, `npm` installé pour pouvoir utiliser la suite `truffle` ou `hardhat` pour interagir et déployer le contrat sur un réseau local `ganache` par exemple


### Quelle est la premiere ligne de code dans un smart contract?

La ligne de commentaire qui indique quelle license est utilisée: `// SPXD-License-Indentifier: <license>`
Suivi des versions du compilateur supportées par le contrat (format `package.json` de `node`): `pragma solidity <versions>;`

### Qu’est-ce qu’un jeton? Et quels sont les type de jetons utilisés?

Un jeton (token en anglais) est un objet ou on peut lui affecter une valeur, peu importe son type (réel, virtuel, ...).
Un token peut donner des permissions spéciales à un utilisateur, permettre un accès à des services ou représenter une possession.
Il peut aussi représenter une crypto-monnaie qui a une vraie valeur monétaire.
Il existe 2 types de tokens:

- Jetons fongibles

Ils sont équivalents, échangeables et leur valeur est déterminée par le nombre possédé. (ie. monnaie)

- Jetons non fongibles 

Ils sont uniques, distincts, et leur valeur est déterminée par lesquelles sont possédées (ie. NFT)

### Quelle est la structure basique d’un jeton ?

Un Jeton est représenté dans le contrat 

### Quel réseau de test est compatible avec client Geth?



### C’est quoi remix-ethereum?

Un IDE en ligne pour développer, débugguer et déployer des smart contracts sur le réseau de son choix

### Quels sont les différents réseaux de Blockchain? Citez les limites et quelques solutions



### Definir la Blockchain avec vos mots propre et citez quelques cas d’usages.


