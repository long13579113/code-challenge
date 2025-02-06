import { useEffect, useState } from 'react'
import BackgroundImage from '../public/background.png'
import { data } from './data'

export const ConvertCurrency = () => {
    const [inputAmount, setInputAmount] = useState('')
    const [outputAmount, setOutputAmount] = useState('0')
    const [inputUnit, setInputUnit] = useState(data[0].currency)
    const [outputUnit, setOutputUnit] = useState(data[1].currency)
    const [inputLogo, setInputLogo] = useState(data[0].image)
    const [outputLogo, setOutputLogo] = useState(data[1].image)
    const [isError, setIsError]  = useState(false)

    const checkInputType = (input: string) => {
        return /^[0-9.]+$/.test(input);
    }

    useEffect(() => {
        if(inputAmount.trim().length > 0) {
            setIsError(!checkInputType(inputAmount.trim()))
        } else {
            setIsError(false)
        }
    },[inputAmount])

    useEffect(() => {
        const logo = data.find(e => e.currency === inputUnit)?.image
        setInputLogo(logo ?? '')
    },[inputUnit])

    useEffect(() => {
        const logo = data.find(e => e.currency === outputUnit)?.image
        setOutputLogo(logo ?? '')
    },[outputUnit])

    const handleSwap = () => {
        const priceInput = data.find(e => e.currency === inputUnit)?.price ?? 0
        const priceOutput = data.find(e => e.currency === outputUnit)?.price ?? 0
        const result = (Number(inputAmount)*priceInput)/priceOutput
        setOutputAmount(result.toString())
    }

    return (
        <div 
            style={{
                display: 'flex',
                backgroundImage: `url(${BackgroundImage})`, 
                width: '100vw',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className="flex flex-col w-[50vw] h-[30vh] bg-white rounded-2xl border border-gray-300 p-10 items-center justify-center gap-4">
                <div className='text-3xl font-serif font-bold'>Convert Currency</div>
                <div className='flex items-center justify-center gap-10'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-end gap-2'>
                            <img src={inputLogo} alt="logo" className='mb-2 max-w-6'/>
                            <div className="max-w-sm mx-auto w-40">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select currency unit from</label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    onChange={(value) => setInputUnit(value.target.value)}
                                >
                                    {data.map((e, index) => 
                                        <>
                                            {index === 0 ? (
                                                <option selected value={e.currency} key={index}>{e.currency}</option>
                                            ) : (
                                                <option value={e.currency} key={index}>{e.currency}</option>
                                            )}
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className='flex items-end gap-2'>
                            <img src={outputLogo} alt="logo" className='mb-2 max-w-6'/>
                            <div className="max-w-sm mx-auto w-40">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select currency unit to</label>
                                <select 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    onChange={(value) => setOutputUnit(value.target.value)}
                                >
                                    {data.map((e, index) => 
                                        <>
                                            {index === 1 ? (
                                                <option selected value={e.currency} key={index}>{e.currency}</option>
                                            ) : (
                                                <option value={e.currency} key={index}>{e.currency}</option>
                                            )}
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Amount to send</label>
                            <input 
                                value={inputAmount} 
                                onChange={(value) => setInputAmount(value.target.value)}
                                type="text" 
                                className={isError ? 
                                    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg block w-full p-2.5" 
                                    : "border border-gray-700 rounded-lg block w-full p-2.5"
                                }
                                placeholder="0.5" 
                            />
                            {isError && 
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> Some error input.</p>
                            }
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Amount to receive</label>
                            <input 
                                value={outputAmount} 
                                onChange={(value) => setOutputAmount(value.target.value)}
                                type="text" 
                                className="border border-gray-700 rounded-lg block w-full p-2.5" 
                                placeholder="0" 
                                disabled
                            />
                        </div>
                    </div>
                    <button 
                        type="button" 
                        className="flex text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l 
                                    hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 
                                    font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 gap-2"
                        disabled={inputAmount.trim() === '' || isError}
                        onClick={() => handleSwap()}
                    >
                        Swap
                    </button>
                </div>
            </div>
        </div>
    )
}