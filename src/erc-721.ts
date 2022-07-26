import { Address } from "@graphprotocol/graph-ts";
import { Transfer } from "../generated/ERC721/ERC721";
import { Collectible } from "../generated/schema";
import {
  getOrCreateAccount,
  getOrCreateCollectible,
  getOrCreateCollection,
} from "./utils";

export function handleTransfer(event: Transfer): void {
  let collection = getOrCreateCollection(event.address);
  let receiver = getOrCreateAccount(event.params.to);
  if (
    event.params.from ==
    Address.fromString("0x0000000000000000000000000000000000000000")
  ) {
    // THIS IS A MINT
    getOrCreateCollectible(
      collection.collectionAddress,
      collection.id,
      event.params.tokenId,
      receiver.id,
      event.block.timestamp
    );
  } else {
    let collectibleId = collection.collectionAddress
      .toHexString()
      .concat("-")
      .concat(event.params.tokenId.toHexString());
    let collectible = Collectible.load(collectibleId);
    if (collectible) {
      if (
        event.params.to ==
        Address.fromString("0x0000000000000000000000000000000000000000")
      ) {
        // THIS IS A BURN
        collectible.removed = event.block.timestamp;
      } else {
        let sender = getOrCreateAccount(event.params.from);
        collectible.owner = sender.id;
        collectible.modified = event.block.timestamp;
      }
      collectible.save()
    }
  }
}
