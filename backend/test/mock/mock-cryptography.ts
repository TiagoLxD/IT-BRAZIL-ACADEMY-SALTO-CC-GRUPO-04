import { HashComparer } from "@/presentation/cryptography/hash-comparer"
import { Hasher } from "@/presentation/cryptography/hasher"

export class HasherSpy implements Hasher {
  digest = 'ff546cc8-6869-11ee-8c99-0242ac120002'
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.isValid
  }
}
