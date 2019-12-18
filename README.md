# React Erasure
![](https://img.shields.io/badge/React-v16.12-red)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

# Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Components](#components)

# Introduction
**React Erasure** is react components library that helps to quickly bootstrap a dapp on Erasure, by accelerating dapp development by abstracting away the complexity.

Libary can be installed by,
```sh
$ npm install @robinthomas/react-erasure
```

# Features
- Supports Erasure protocol version v1.1.0
- Supports Ethereum mainnet and Rinkeby networks
- Provides various React components
    - Login
    - Feed
    - Post
    - Reveal Post
    - Stake
    - Punish
    - Reward
    - Release Stake
    - Retrieve Stake

# Components

##### Login
- To setup the Metamask provider and permissions

##### Feed
- create a new feed

##### Post
- create a new post
- select one of the feeds detected in this account, to which the post can be added
- progress bar for uploading raw data

##### Reveal Post
- select a feed
- select a post under that feed and then reveal it

##### Stake
- create a new countdown griefing agreement

##### Punish
- select one of the griefing auto-detected
- punish the staker (in NMR)
- add a punishment message

##### Reward
- select one of the griefing auto-detected
- reward the staker (in NMR)

##### Release Stake
- select one of the griefing auto-detected 
- release some stake to the staker (in NMR)

##### Retrieve Stake
- select one of the griefing auto-detected 
- release some stake to the staker (in NMR)
