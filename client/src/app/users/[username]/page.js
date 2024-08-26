

export default async function User({params}){
    const username= params.username;
    console.log(params)

    return(
        <>
            <p>{username}</p>
        </>
    )
}