"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import './css/styles.css';
import Script from 'next/script';

const History = () => {
	useEffect(() => {
		// Load scripts only on client side, sequentially
		const scripts = [
			'/js/jquery/jquery-1.7.1.min.js',
            '/js/jquery/jquery-ui-1.8.18.custom.min.js',
			'/js/jquery/jquery.ui.touch-punch.js',
			'/js/audiojs/audio.min.js',
			'/js/tinyscrollbar/jquery.tinyscrollbar.js',
			'/js/tipsy/jquery.tipsy.js',
			'/js/prettyPhoto/js/jquery.prettyPhoto.js'
		];
		
		const timelineScript = '/js/jquery.timeline.js';

		let loadedCount = 0;
		let failedCount = 0;

		const hidePreloader = () => {
			const preloader = document.querySelector('.preload') as HTMLElement;
			if (preloader) {
				preloader.style.display = 'none';
				console.log('✅ Preloader hidden');
			}
		};

		const loadScript = (index: number) => {
			if (index >= scripts.length) {
				console.log(`✅ All scripts loaded (${loadedCount} success, ${failedCount} failed)`);
				// Now load the timeline script with a ready handler patch
				loadTimelineScript();
				return;
			}

			const script = document.createElement('script');
			script.src = scripts[index];
			script.async = false;
			script.type = 'text/javascript';
			
			script.onload = () => {
				loadedCount++;
				console.log(`✅ Loaded (${index + 1}/${scripts.length}): ${scripts[index]}`);
				setTimeout(() => {
					loadScript(index + 1);
				}, 300);
			};
			script.onerror = () => {
				failedCount++;
				console.error(`❌ Failed to load (${index + 1}/${scripts.length}): ${scripts[index]}`);
				setTimeout(() => {
					loadScript(index + 1);
				}, 300);
			};
			document.head.appendChild(script);
		};

		const loadTimelineScript = () => {
			const $ = (window as any).jQuery;
			if (!$) {
				console.error('jQuery not found');
				hidePreloader();
				return;
			}

			// Load the timeline script
			const script = document.createElement('script');
			script.src = timelineScript;
			script.async = false;
			script.type = 'text/javascript';

			script.onload = () => {
				console.log('Timeline script loaded');
				
				// Give the script a moment to parse and define the function
				setTimeout(() => {
					console.log('Checking for $.myTimeline...');
					console.log('Type of $.myTimeline:', typeof $.myTimeline);
					console.log('audiojs available:', typeof (window as any).audiojs !== 'undefined');
					
					// The timeline plugin defines $.myTimeline function
					// We commented out the document.ready() in the plugin, so call it manually
					if (typeof $.myTimeline === 'function') {
						console.log('$.myTimeline is a function, calling it...');
						try {
							$.myTimeline();
							console.log('Timeline initialized successfully');
						} catch (e) {
							console.error('Error calling $.myTimeline():', e);
						}
					} else {
						console.error('$.myTimeline is not a function');
					}

					hidePreloader();
				}, 100);
			};

			script.onerror = () => {
				console.error('Failed to load timeline script');
				hidePreloader();
			};

			document.head.appendChild(script);
		};

		loadScript(0); // Start loading from first script

		// Fallback: hide preloader after 8 seconds regardless
		const fallbackTimeout = setTimeout(() => {
			console.warn('⏱️ Timeout reached, hiding preloader');
			hidePreloader();
		}, 8000);

		return () => {
			clearTimeout(fallbackTimeout);
			// Cleanup: remove scripts
			[...scripts, timelineScript].forEach((src) => {
				const scriptElements = document.querySelectorAll(`script[src="${src}"]`);
				scriptElements.forEach((script) => script.remove());
			});
		};
	}, []);

    return (
    <>

		<section className='width-[100vw] h-screen'>
		
		{/* DEMO CONTAINER (THIS SHOULD BE YOUR DESTINATION DIV) */}
		<div className="container">
			
			{/* PRELOAD */}
			<div className="preload">
				<Image src="/images/preloader.gif" alt="" width={30} height={30}/>
			</div>
			
			
			{/* TIMELINE CONTAINER */}
			<div id="timeline_container">
				
				{/* TIMELINE */}
				<div id="timeline" 
					data-fadeindelay="3000"
					data-width="1052"
					data-height="450"
					data-imageswidth="3400"
					data-imagesheight="265"
					data-contentwidth="1670"
					data-contentheight="174"
					data-draggerwidth="59"
					data-draggerheight="21"
					data-mousewheel="1"
				>

						
						{/* VIEWPORT - IMAGES */}
						<div className="viewport">
							<div className="images">
								<Image src="/images/hero.png" alt="" width={300} height={200} />
								<Image src="/images/content_img_1.png" alt="" width={300} height={200} />
								<Image src="/images/content_img_2.png" alt="" width={300} height={200} />
								<Image src="/images/content_img_4.png" alt="" width={300} height={200} />
								<Image src="/images/content_img_5.png" alt="" width={300} height={200} />
								<Image src="/images/content_img_6.jpg" alt="" width={300} height={200} />
							</div>
						</div>
						
						
						{/* SCROLLBAR (EDIT CSS FOR STYLING) */}
						<div className="scrollbar">
							<div className="track">
							
								{/*  MILESTONES MARKS */}
								<div className="marks">
									<div id="m0" className="mark" data-xpos="360" data-label="MARCH 2018"></div>
									<div id="m1" className="mark" data-xpos="520" data-label="2005"></div>
									<div id="m2" className="mark" data-xpos="700" data-label="2020 - PARTNERS"></div>
									<div id="m3" className="mark" data-xpos="810" data-label="2021"></div>
								</div>
								
								<div className="dragger"></div>
							</div>
						</div>
						
						
						{/* MILESTONES */}
						<div className="milestones">
						
							<div className="content">
							
								
								{/* MILESTONE SAMPLE 1 (FIRST) */}
								<div className="column_first">
									<div className="c200">
										<span className="date">SEPTEMBER 2017 - EROEFFNUNG</span>
										<span className="txt">Michael Schreck und Volker Schneider eröffnen in Hommage an eine typische Kiezkneipe auf St. Pauli - in der Altstadt <strong>den Rettungsanker - Freiburg</strong><br/> </span>
									</div>
								</div>
								
								{/* MILESTONE SAMPLE 2 */}
								<div className="column">
									<div className="c125">
										<span className="date">2018</span>
										<span className="txt">Der Retungsanker hat sich in der Freiburger<br/><br/>Knepipenszene voll etabliert</span>
										<span className="thumb"><a href="#extended_text1" data-rel="prettyPhoto" title=""><Image src="/images/read_more.png" width={30} height={30} alt="" className="readmore" title="READ MORE" /></a></span>

										<div id="extended_text1" className="hidden">	{/* SAMPLE OF HIDDEN DIV WITH EXTENDED CONTENT */}
											<p><strong>Sample of extended content opened with lightbox</strong><br/><br/>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip <a href="http://www.themeforest.net" target="_blank">sample of external link</a>. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
										</div>
									</div>
								</div>
								
								{/* MILESTONE SAMPLE 3 */}
								<div className="column">
									<div className="c125">
										<span className="date">SEPTEMBER 2019</span>
										<span className="txt">Ut enim ad minim veniam, quis nostrud exercitation ullamco.</span>
										<span className="date"><br/>NOVEMBER 2019</span>
										<span className="txt">Duis aute irure dolor in voluptate velit esse.</span>
									</div>
								</div>
								
								{/* MILESTONE SAMPLE 4 */}
								<div className="column">
									<div className="c125">
										<span className="date">2020 - 20 YEARS<br/>ANNIVERSARY VIDEO</span>
										<span className="thumb"><a href="http://vimeo.com/24492485" data-rel="prettyPhoto" title="20 Years Anniversary Video" className="video_rollover"><Image src="/images/video_sample_thumb.png" width={30} height={30} alt="" /></a></span>
										<span className="thumb_description">Short video description</span>
									</div>
								</div>
								
								{/* MILESTONE SAMPLE 5 */}
								<div className="column">
									<div className="c150">
										<span className="date">2021</span>
										<span className="txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
										<span className="big_link"><a href="images/gallery_sample_02.jpg" data-rel="prettyPhoto[sample_gallery]" title="Gallery sample 01"> IMAGE GALLERY</a></span>
										
										<div className="hidden">	{/* SAMPLE OF HIDDEN GALLERY ITEMS */}
											<a href="images/gallery_sample_01.jpg" data-rel="prettyPhoto[sample_gallery]" title="Gallery sample 02"></a>
											<a href="images/gallery_sample_03.jpg" data-rel="prettyPhoto[sample_gallery]" title="Gallery sample 03"></a>
										</div>
										
									</div>
								</div>
								
								{/* MILESTONE SAMPLE 6 */}
								<div className="column">
									<div className="c125">
										<span className="date">2022 - WPA PARTNERS</span>
										<span className="txt">Sample of external links:</span>
										<span className="link"><br/><a href="http://themeforest.net/user/pezflash" target="_blank">www.envato.com</a></span>
										<span className="link"><a href="http://themeforest.net/user/pezflash" target="_blank">www.themeforest.net</a></span>
										<span className="link"><a href="http://themeforest.net/user/pezflash" target="_blank">www.codecanyon.net</a></span>
									</div>
								</div>
								
								{/* MILESTONE SAMPLE 7 */}
								<div className="column">
									<div className="c225">
										<span className="date">2023 - WIDE COLUMN SAMPLE</span>
										<span><Image src="/images/logos.png" alt="Logos" width={200} height={100} /></span>
										<span className="txt">Ut enim ad minim veniam, quis nostrud exercit ullamco. Duis aute irure dolor in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </span>	
										<span className="thumb"><a href="#extended_text2" data-rel="prettyPhoto" title=""><Image src="/images/read_more.png" alt="" width={30} height={30} className="readmore" title="READ MORE" /></a></span>
										
										<div id="extended_text2" className="hidden">	{/* SAMPLE OF HIDDEN DIV WITH EXTENDED CONTENT */}
											<p><strong>Sample of extended content opened with lightbox</strong><br/><br/>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip <a href="http://www.themeforest.net" target="_blank">sample of external link</a>. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
										</div>
									</div>
								</div>
								
								{/* MILESTONE SAMPLE 8 */}
								<div className="column">
									<div className="c125">
										<span className="date">2024 - PRESENT</span>
										<span className="thumb"><a href="images/gallery_sample_01.jpg" data-rel="prettyPhoto[sample_gallery2]" title="10 Years Anniversary Video" className="image_rollover"><Image src="/images/image_sample_thumb.png" width={30} height={30} alt="" /></a></span>
										<span className="thumb_description">Image description</span>
										
										<div className="hidden">	{/* SAMPLE OF HIDDEN GALLERY ITEMS */}
											<a href="/images/gallery_sample_02.jpg" data-rel="prettyPhoto[sample_gallery2]" title="Gallery sample 02"></a>
											<a href="/images/gallery_sample_03.jpg" data-rel="prettyPhoto[sample_gallery2]" title="Gallery sample 03"></a>
										</div>
									</div>
								</div>
								
							</div> {/* end content */}
							
						</div> {/* end milestones */}
						
						
						{/* AUDIO PLAYER */}
						<div className="audio_player">
							<audio src="/mp3/" preload="auto"></audio>
						</div>
										
				
				</div> {/* end timeline */}
				
				
				{/* SHADOW */}
				<div className="shadow">
					<Image src="/images/shadow.png" alt="" width={700} height={100} />
				</div>
			
			
			</div> {/* end timeline container */}

		</div> {/* end container */}		
<h1 className="text-center mt-[40vh] text-6xl font-bold">Timeline</h1>
	<h1 className="text-center mt-[2vh] text-6xl font-bold">Rettungsanker Freiburg</h1>
	
	</section>
</>
    )

}

export default History
