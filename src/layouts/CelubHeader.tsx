import arrow from'../assets/images/celub/arrow.png';
function CelubHeader(value:string){
    return(
        <>
            <div id="celubHeader1">
                <img id="arrow_loc" src={arrow} />
                <h4>{value}</h4>
            </div>
        </>
    );
}
export default CelubHeader;