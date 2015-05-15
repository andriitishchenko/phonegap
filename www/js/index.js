/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);


                //Initializing the canvas
                var canvas ,ctx;
                //Canvas dimensions
                var W = 500; var H = 500;
                var exlosions =[];

                    console.log("init");
                    canvas = document.getElementById("canvas");
                    ctx = canvas.getContext("2d");
                    for(var i=0;i<2;i++){
                        var point = {};
                        if (i==0) {
                        point.x = 100;
                        point.y = 100;  
                        }else{
                            point.x = 400;
                            point.y = 400;
                        }
                        
                        exlosions.push(explosion(point,20*(i+1),10));   
                    }   
                    setInterval(scene, 33);


                function scene()
                {
                        ctx.globalCompositeOperation = "source-over";
                        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
                        ctx.fillRect(0, 0, W, H);
                        
                        //Lets blend the particle with the BG
                        ctx.globalCompositeOperation = "lighter";
                    for (var i = 0;i<exlosions.length ; i++) {
                        var exp = exlosions[i];
                        exp.draw();
                    }
                }
                function explosion(epicenter,radius,particles_count)
                {
                    var I={};
                    I.x = epicenter.x;
                    I.y = epicenter.y;
                    I.radius = radius;
                    I.particles_count =particles_count;
                    I.particles = [];
                    var fill_particle = function()
                    {
                        var pcount = I.particles_count - I.particles.length;
                        for(var i = 0; i < pcount; i++)
                        {
                            I.particles.push(new I.particle_item(I.x,I.y,10));
                        }
                    }
                    
                    I.particle_item = function(x,y,lenght){
                        this.x = x;
                        this.y = y;
                        this.status = 1;
                    //Lets add random velocity to each particle
                        this.vx = Math.random()*lenght-lenght/2;
                        this.vy = Math.random()*lenght-lenght/2;
                    //Random colors
                        var r = Math.random()*255>>0;
                        var g = Math.random()*255>>0;
                        var b = Math.random()*255>>0;
                        this.color = "rgba("+r+", "+g+", "+b+", 0.5)";
                    //Random size
                        this.radius = Math.random()*lenght+lenght;
                    }
                    I.draw = function(){
                        /*
                        ctx.globalCompositeOperation = "source-over";
                        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
                        ctx.fillRect(0, 0, W, H);
                        
                        //Lets blend the particle with the BG
                        ctx.globalCompositeOperation = "lighter";
                        */
                        //Lets draw particles from the array now
                        for(var t = 0; t < I.particles.length; t++)
                        {
                            var p = I.particles[t];
                            
                            ctx.beginPath();
                            
                            //Time for some colors
                            var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                            gradient.addColorStop(0, "white");
                            gradient.addColorStop(0.4, "white");
                            gradient.addColorStop(0.4, p.color);
                            gradient.addColorStop(1, "black");
                            
                            ctx.fillStyle = gradient;
                            ctx.arc(p.x, p.y, p.radius, Math.PI*2, false);
                            ctx.fill();
                            
                            //Lets use the velocity now
                            p.radius--;
                            p.x += p.vx;
                            p.y += p.vy;
                            
                            //To prevent the balls from moving out of the canvas
                            /*
                            if(p.x < -50) p.x = W+50;
                            if(p.y < -50) p.y = H+50;
                            if(p.x > W+50) p.x = -50;
                            if(p.y > H+50) p.y = -50;
                            */
                            if(p.x < I.x-I.radius||
                                p.x > I.x+I.radius|| 
                                p.y < I.y-I.radius||
                                p.y > I.x+I.radius||
                                p.radius<3)
                            {
                                 p.status = 0;   
                            }
                        }
                        I.particles = I.particles.filter(function(item) {
                                return item.status==1;
                              });
                        if(I.particles.length < 3)
                        {
                            fill_particle();
                        }
                    }
                        
                    
                    fill_particle();
                    
                    return I;
                }



    }
};

app.initialize();