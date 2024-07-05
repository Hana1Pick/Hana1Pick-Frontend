import arrow from'../assets/images/celub/arrow.png';
interface CelubHeaderProps {
    value: string;
}
function CelubHeader({ value }: CelubHeaderProps){
    return(
        <>
            <div id="celubHeader1">
                <img className="back" src={arrow} />
                <h4>{value}</h4>
            </div>
        </>
    );
}
export default CelubHeader;