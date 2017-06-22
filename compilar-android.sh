#!/bin/sh
echo "*** Compilando Android APK... ***\n"

export HOME_PROJ=$(pwd)

cp release-signing.properties platforms/android/release-signing.properties

ionic build android --release

echo "*** Proceso terminado. Revise platforms/android/build/outputs/apk. ***\n"