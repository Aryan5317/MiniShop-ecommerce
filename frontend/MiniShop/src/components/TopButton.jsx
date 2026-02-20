function TopButton() {
    const ScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    return (
        <button onClick={ScrollTop} className='hidden md:flex flex items-center justify-center mt-1 w-full h-[35px] bg-white md:h-[50px] shadow-lg'>
            <h2 className='text-sky-600 text-lg font-large md:text-xl md:font-semibold'>Back to top</h2>
        </button>
    )
}

export default TopButton
