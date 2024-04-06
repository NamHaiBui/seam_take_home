import Loading from "@/components/Loading"
import { useEffect, useState } from "react"
interface ParentProps {
    children: React.ReactNode;
}
const MainLayout: React.FC<ParentProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        window.addEventListener("storage", function () {
            const res = localStorage.getItem('isLoading')
            res === 'false' ? setIsLoading(false) : setIsLoading(true)
        })
    })

    return (
        <>
            <div id="MainLayout" className='relative max-h-screen'>
                <div>{children}</div>
                <div>
                    {isLoading ? <Loading /> : <div></div>}
                </div>
            </div>
        </>
    )
}

export default MainLayout