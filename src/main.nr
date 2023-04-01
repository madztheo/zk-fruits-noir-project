global MAX_ARRAY_SIZE: Field = 20;

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

fn main(setA : [Field; MAX_ARRAY_SIZE], setB : [Field; MAX_ARRAY_SIZE]) {
    let cardinality = getIntersectionCardinality(setA, setB);
    constrain cardinality != 0;
}