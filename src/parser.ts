import { SpeechSegment } from "@speechly/react-client";

export enum IntentType {
  Unknown = "unknown",
  Donate = "donate",
}

export enum EntityType {
  Cloth = "cloth",
  Num = "number",
}

export enum ClothType {
    Unknown = "unknown",
    Sweater = "sweater",
    Sweaters = "sweaters",
    Shirt = "shirt",
    Shirts = "shirts",
    Tshirt = "t-shirt",
    Tshirts = "t-shirts",
    Pant = "pant",
    Pants = "pants",
    Jean = "jean",
    Jean = "jeans",
    Trackpant = "trackpant",
    Trackpants = "trackpants",
    Jacket = "jacket",
    Jackets = "jackets",
    Hoodie = "hoodie",
    Hoodies = "hoodies",
    Blanket = "blanket",
    Blankets = "blankets"
}

const SpeechIntentValues = Object.values(IntentType) as string[];
const ClothTypeValues = Object.values(ClothType) as string[];

export function parseIntent(segment: SpeechSegment): IntentType {
  const { intent } = segment;

  if (SpeechIntentValues.includes(intent.intent)) {
    return intent.intent as IntentType;
  }

  return IntentType.Unknown;
}

export function parseTypeEntity(segment: SpeechSegment): string[] {
  const langs: string[] = [];

  for (const e of segment.entities) {
    segment.entities.value = "-";
    if (e.type === EntityType.Cloth) {
      langs.push(e.value.toLowerCase());
    }
  }

  return langs;
}

export function parseClothEntity(segment: SpeechSegment): ClothType {
  let s = ClothType.Unknown;

  for (const e of segment.entities) {
    segment.entities.value = "-";
    const val = e.value.toLowerCase();

    if (e.type === EntityType.Cloth && ClothTypeValues.includes(val)) {
      s = val as ClothType;
    }
  }

  return s;
}