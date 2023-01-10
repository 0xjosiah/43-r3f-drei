import { OrbitControls, TransformControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience() {
    const boxRef = useRef(null)

    return (     
        <>
            <OrbitControls />

            <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
            <ambientLight intensity={ 0.5 } />

            <mesh position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh position-x={ 2 } scale={ 1.5 } ref={ boxRef }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <TransformControls object={ boxRef } /> 
            {/* if using ref solution, this needs to be after the referenced obj */}

            <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>

        </>
    ) 
}