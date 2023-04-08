use dep::std;

global MAX_ARRAY_SIZE: Field = 20;

fn checkCommitment(commitment: Field, set: [Field; MAX_ARRAY_SIZE]) {
    let computedCommitment = std::hash::pedersen(set);
    constrain commitment == computedCommitment[0];
}

fn getIntersectionCardinality(setA : [Field; MAX_ARRAY_SIZE], setB : [Field; MAX_ARRAY_SIZE]) -> Field {
    let mut cardinality: Field = 0;
    for i in 0..MAX_ARRAY_SIZE {
        for j in 0..MAX_ARRAY_SIZE {
            // We only need to check that setA[i] != 0, as if this condition holds
            // then setA[i] == setB[j] implies that setB[j] != 0.
            if (setA[i] != 0) & (setA[i] as u64 == setB[j] as u64) {
                cardinality += 1;
            }
        }
    }
    cardinality
}

fn main(
    // A pedersen hash of the first set of hashed elements
    // serving as a public commitment to the first set
    commitmentA: pub Field, 
    // A pedersen hash of the second set of hashed elements
    // serving as a public commitment to the second set
    commitmentB: pub Field, 
    // First set of hashed elements (can be any hash function)
    setA : [Field; MAX_ARRAY_SIZE], 
    // Second set of hashed elements (can be any hash function)
    setB : [Field; MAX_ARRAY_SIZE]
) {
    // Check that the commitments are valid
    checkCommitment(commitmentA, setA);
    checkCommitment(commitmentB, setB);
    // Retrieve the cardinality of the intersection, if there is any
    let cardinality = getIntersectionCardinality(setA, setB);
    // Make sure the proof will only succeed if the intersection is non-empty
    constrain cardinality != 0;
}