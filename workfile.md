NFT Collection Tracking

Collection 1 - [Noun Punks 4 Peace](https://opensea.io/collection/nounpunks4peace)

Contract Address - 0x4628A523D0Bf5C45A8a7116b26F5AA828c9aCe54


graph init --from-contract 0x4628A523D0Bf5C45A8a7116b26F5AA828c9aCe54 --network mainnet --abi ./ERC721.json

Schema - 
```
type Account @entity {
  id: ID!
  address: Bytes!
  collectibles: [Collectible!] @derivedFrom(field: "owner")
}

type Collectible @entity {
  id: ID!
  tokenId: BigInt!
  creator: Account!
  owner: Account!
  collection: Collection!
  descriptorUri: String!

  #Timestamps
  modified: BigInt
  created: BigInt!
  removed: BigInt

  #metadata
  name: String
  description: String
  imageURL: String
}

type Collection @entity {
  id: ID!
  collectionName: String
  collectionSymbol: String
  collectionAddress: Bytes!
  collectibles: [Collectible!] @derivedFrom(field: "collection")
}

```