export default async function Home() {
	console.log('am I a server or a client?');
	const data = await fetch('http://localhost:3000/api/hello').then((res) =>
		res.json()
	);
	return (
		<>
			<code>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</code>
			<h1 className='text-lg text-white'>we Welcome to Next</h1>
		</>
	);
}
