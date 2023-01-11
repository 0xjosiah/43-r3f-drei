import { Sparkles, Cloud, Float, Text, Html, OrbitControls, PivotControls, TransformControls, MeshReflectorMaterial, Sky, Stars } from '@react-three/drei'
import { useRef } from 'react'
import { useControls } from 'leva'

export default function Experience() {
    const boxRef = useRef(null)
    const sphere = useRef(null)
    const { positionY, spherePCisVisible, posX, position } = useControls({
        positionY: 0,
        spherePCisVisible: true,
        posX: {
            value: -2,
            min: -4,
            max: 4,
            step: 0.1
        },
        position: {
            value: { x: -2, y: 0, z: 0 },
            min: -4,
            max: 4,
            step: 0.1,
            joystick: 'invertY' // joystick avail if only using x and y
        },
    })

    return (     
        <>
            <OrbitControls makeDefault />

            <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
            <ambientLight intensity={ 0.5 } />

            <Sky distance={450000} sunPosition={[0, .1, 10000]} inclination={5} azimuth={0.25} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Cloud
                opacity={0.5}
                speed={0.4} // Rotation speed
                width={10} // Width of the full cloud
                depth={1.5} // Z-dir depth
                segments={20} // Number of particles
                position={[0, 10, -20]}
            />
            <Sparkles
                // /** Number of particles (default: 100) */
                // count?: number
                // /** Speed of particles (default: 1) */
                // speed?: number | Float32Array
                // /** Opacity of particles (default: 1) */
                // opacity?: number | Float32Array
                // /** Color of particles (default: 100) */
                // color?: THREE.ColorRepresentation | Float32Array
                // /** Size of particles (default: randomized between 0 and 1) */
                // size?: number | Float32Array
                // /** The space the particles occupy (default: 1) */
                // scale?: number | [number, number, number] | THREE.Vector3
                // /** Movement factor (default: 1) */
                // noise?: number | [number, number, number] | THREE.Vector3 | Float32Array
            />

            <PivotControls 
                anchor={[ 0, 0, 0 ]}
                depthTest={ false }
                lineWidth={ 4 }
                axisColors={ [ 0x9381ff, 0xff4d6d, 0x7ae582 ]}
                scale={ 2 }
                visible={ spherePCisVisible }
                // fixed={ true } this removes perspective, obj stays same size regardless of depth
            >
                <mesh position-x={ posX } ref={ sphere } position-y={ positionY } position={[ position.x, position.y, position.z ]}>
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
                    resolution={ 512 }
                    blur={ [1000, 1000] }
                    mixBlur={ .75 }
                    mirror={ .75 }
                    color="greenyellow"
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