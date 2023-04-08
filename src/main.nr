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
            if (setA[i] != 0) & (setB[i] != 0) & (setA[i] as u64 == setB[j] as u64) {
                cardinality += 1;
            }
        }
    }
    cardinality
}

fn main(
    commitmentA: pub Field, 
    commitmentB: pub Field, 
    setA : [Field; MAX_ARRAY_SIZE], 
    setB : [Field; MAX_ARRAY_SIZE]
) {
    checkCommitment(commitmentA, setA);
    checkCommitment(commitmentB, setB);
    let cardinality = getIntersectionCardinality(setA, setB);
    constrain cardinality != 0;
}