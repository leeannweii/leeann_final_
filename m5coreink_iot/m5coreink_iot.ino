#include "arduino_secrets.h"

#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>
#include <WiFi.h>
#include <AdafruitIO_WiFi.h>
#include "M5CoreInk.h" 



// initialize WiFi connection:
WiFiClient wifi;
AdafruitIO_WiFi io(SECRET_AIO_USERNAME, SECRET_AIO_KEY, SECRET_SSID, SECRET_PASS);
AdafruitIO_Feed *circlefeed = io.feed("circlefeed");



Adafruit_MPU6050 imu;

Ink_Sprite PageSprite(&M5.M5Ink);  // e-ink display sprite
unsigned long updateTimer = 0;
unsigned long sensorTimer = 0;

int sensorVal1;
int sensorVal2;

void setup(void) {
  M5.begin(); 
  // default uses bottom connector pins G32 (SDA), G33 (SCL)
  Wire.begin(21, 22); // use back connector pins G21 (SDA), G22 (SCL)
  Serial.begin(9600);
  
  // initialize imu:
  if (imu.begin()) { 
    imu.setAccelerometerRange(MPU6050_RANGE_8_G);
    imu.setGyroRange(MPU6050_RANGE_500_DEG);
    imu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  }
  else {
    Serial.println("Failed to find MPU6050 chip");
  }
  
  Serial.print("Connecting to Adafruit IO");
  io.connect();
  
 

  
  while(io.status() < AIO_CONNECTED) {
  Serial.print(".");
  delay(500);
  }
  
  circlefeed->get();


  // print connection status
  Serial.println(io.statusText());
  
}

void loop() {
  io.run();
  
  
  if(millis() > updateTimer + 100) {

    // get new sensor events:
    sensors_event_t a, g, temp;
    imu.getEvent(&a, &g, &temp);

    // print accelerometer values to Serial:
    Serial.print(a.acceleration.x);
    Serial.print(", ");
    Serial.print(a.acceleration.y);
    Serial.print(", ");
    Serial.print(a.acceleration.z);
    Serial.print(", ");

    // print gyroscope values to Serial:
    Serial.print(g.gyro.x);
    Serial.print(", ");
    Serial.print(g.gyro.y);
    Serial.print(", ");
    Serial.print(g.gyro.z);
    Serial.println("");
    sensorVal1 = a.acceleration.x;
    sensorVal2 = a.acceleration.y;

    updateTimer = millis();
  }
  
  if(millis() > sensorTimer + 2000) {

    // read a 12-bit sensor value:
    // int sensorVal = analogRead(sensorPin);  

    // print sensorVal to Serial port:
    // Serial.print("send sensorVal: ");
    // Serial.println(sensorVal);

    circlefeed->save(sensorVal1);
    // circlefeed->save(sensorVal2);
    
    
    sensorTimer = millis();
  }
  
  
  M5.update();
}