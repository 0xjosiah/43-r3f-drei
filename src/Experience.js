import { Float, Text, Html, OrbitControls, PivotControls, TransformControls, MeshReflectorMaterial } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useRef } from 'react'

export default function Experience() {
    const boxRef = useRef(null)
    const sphere = useRef(null)
    const THREE = useThree()

    return (     
        <>
            <OrbitControls makeDefault />

            <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
            <ambientLight intensity={ 0.5 } />

            <PivotControls 
                anchor={[ 0, 0, 0 ]}
                depthTest={ false }
                lineWidth={ 4 }
                axisColors={ [ 0x9381ff, 0xff4d6d, 0x7ae582 ]}
                scale={ 2 }
                // fixed={ true } this removes perspective, obj stays same size regardless of depth
            >
                <mesh position-x={ - 2 } ref={ sphere }>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                    <Html
                        position={[ 0, 1.15, 0 ]}
                        wrapperClass="label"
                        center // makes center of html element the pivot point
                        distanceFactor={ 6 } // adds perspective to html element
                        occlude={ [boxRef, sphere] } // hides element behind objects if provided in array
                    >
                        This is a sphere 👍
                    </Html>
                </mesh>
            </PivotControls>

            <mesh position-x={ 2 } scale={ 1.5 } ref={ boxRef }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <TransformControls object={ boxRef } mode='translate' /> 
            {/* if using ref solution, this needs to be after the referenced obj, better solution because independent, can remove transform controls with no issue */}

            <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
                <planeGeometry />
                {/* <meshStandardMaterial color="greenyellow" /> */}
                <MeshReflectorMaterial 
                    // this doesn't work with non-planar meshes e.g. a sphere
                /> 
            </mesh>

            <Float
                speed={ 5 }
                floatIntensity={ 20 }
            >
                <Text
                    font='bangers-v20-latin-regular.woff'
                    fontSize={ 1 }
                    color="salmon"
                    position={[ 0, 5.5, -5 ]}
                    maxWidth={ .5 }
                    textAlign="center"
                    outlineBlur={.2}
                >
                    I
                    <meshNormalMaterial/>
                </Text>
                <Text
                    font='bangers-v20-latin-regular.woff'
                    fontSize={ 1 }
                    color="salmon"
                    position={[ 0, 4.5, -4 ]}
                    maxWidth={ .5 }
                    textAlign="center"
                    outlineBlur={.2}
                >
                    am
                    <meshNormalMaterial/>
                </Text>
                <Text
                    font="https://fonts.gstatic.com/s/sirinstencil/v6/mem4YaWwznmLx-lzGfN7MdRyRc9MAQ.woff"
                    fontSize={ 2 }
                    color="salmon"
                    position={[ 0, 3, -3 ]}
                    maxWidth={ .5 }
                    textAlign="center"
                    outlineBlur={.2}
                >
                    0xjosiah
                    <meshNormalMaterial/>
                </Text>
            </Float>


        </>
    ) 
}