import {firestore} from "./datafb";

import {collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs} from "@firebase/firestore";
import {useEffect, useState} from "react";

const testCollection = collection(firestore, 'testing');
const [test, setTest] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
const [loading, setLoading] = useState<boolean>(true);
export default async function Test() {
    const test = query(testCollection, where('done', '==', false), limit(10));
    const querySnap = await getDocs(test);

    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnap.forEach((snap) => {
        result.push(snap);
    });
    setTest(result);

    return (<>
        Test values : {test}
    </>)
};

useEffect(() => {
    Test();
    setTimeout(() => {
        setLoading(false);
    }, 1000)
    // every 1 second
}, [])