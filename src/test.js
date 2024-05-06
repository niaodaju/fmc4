const a={a:[1,2],
b:{a:4},d:5}

const b={...a}
console.log(b.a===a.a)
// b.a=a.a.slice();
b.a[1]=4343;
b.a[0]=434;
b.b.a=888888;
b.d=8;
console.log(a,b)


const c=[1,2,3]

const d=[...c]
d[0]=4
console.log(c,d)