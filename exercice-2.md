# Developpement de nouvelle technologies - Blockchain

## Exercice 1

C'est [ce](README.md) repository :^)

## Exercice 2

### C’est quoi Solidity ?

C'est un langage orienté objet fortement typé (comme le C++) utilisé pour développer des contrats intelligents (smart contracts) 

### Quelle est la dernière version stable du compilateur ?

`solc 0.8.16+commit.07a7930e` à la date du 6 septembre 2022

### Qu’est-ce qu’un smart contract ? ET comment fonctionne t’il?

C'est un programme qui contrôle directement les actifs numériques par le biais de contrats.
Il détermine les actions sur un actif, lié directement dans le programme stocké dans la blockchain, en fonction des conditions définies dans le contrat.

### Quels sont les outils utilisés pour développer un smart contract?

  - En cloud: un IDE `remix.ethereum.org`, l'extension MetaMask sur le navigateur avec un compte MetaMask connecté de préférence sur un réseau test Ethereum
  - En local: un compilateur `solc` installé, `npm` installé pour pouvoir utiliser la suite `truffle` ou `hardhat` pour interagir et déployer le contrat sur un réseau local `ganache` par exemple


### Quelle est la premiere ligne de code dans un smart contract?

La ligne de commentaire qui indique quelle license est utilisée: `// SPDX-License-Indentifier: <license>`,
suivi des versions du compilateur supportées par le contrat (format `package.json` de `node`): `pragma solidity <versions>;`.

Le contrat en lui-même commence par `contract Contract { };`

### Qu’est-ce qu’un jeton? Et quels sont les type de jetons utilisés?

Un jeton (token en anglais) est un objet ou on peut lui affecter une valeur, peu importe son type (réel, virtuel, ...).
Un token peut donner des permissions spéciales à un utilisateur, permettre un accès à des services ou représenter une possession.
Il peut aussi représenter une crypto-monnaie qui a une vraie valeur monétaire.
Il existe 2 types de tokens:

**Jetons fongibles**: Ils sont équivalents, échangeables et leur valeur est déterminée par le nombre possédé. (ie. monnaie)

**Jetons non fongibles**: Ils sont uniques, distincts, et leur valeur est déterminée par lesquelles sont possédées (ie. NFT)

### Quelle est la structure basique d’un jeton ?

Un Jeton est représenté par des standards en fonction de son type. Ces standards définissent les opérations à mettre en place dans les contrats:

S'il est fongible alors les standards [ERC-20](https://eips.ethereum.org/EIPS/eip-20) ou [ERC-777](https://eips.ethereum.org/EIPS/eip-777) sont disponibles.

S'il est non-fongible alors le standard [ERC-721](https://eips.ethereum.org/EIPS/eip-721) définit les opérations à appliquer

### Quel réseau de test est compatible avec client Geth?

Ropsten, Rinkerby, Goerly et Sepolia, en plus des réseaux locaux et privés.

### C’est quoi remix-ethereum?

Un IDE en ligne pour développer, débugguer et déployer des smart contracts sur le réseau de son choix

### Quels sont les différents réseaux de Blockchain? Citez les limites et quelques solutions

**Public**:  Authorité décentralisée, transactions publiques et accessibles par tous

**Private**: Authorité possiblement centralisée par une seule organisation, l'accès est accordé par invitation

**Permission**: Réseau public ou l'accès est accordé par invitation

**Consortium**: Réseau par permission ou l'authorité est centralisée par plusieurs entités


### Definir la Blockchain avec vos mots propre et citez quelques cas d’usages.

C'est une base de données qui contient l'historique de toutes les transactions (blocks) depuis sa création.
Les particularités sont que les blocks sont cryptées, et que l'hébergement en tant que tel de la base est décentralisée

Applications:

- Finance: la blockchain peut agir en tant que grand livre de compte distribué, ce qui permet de ne pas passer par des banques pour les échanges

- Logistique: l'historisation de tous les mouvements de stocks permet une tracabilité des produits 


