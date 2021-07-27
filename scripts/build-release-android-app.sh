react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

echo "Start Building..."

rm -rf ./android/app/src/main/res/drawable-*
rm -rf ./android/app/src/main/res/raw

cd android

# ./gradlew clean
./gradlew assembleRelease

echo "Your android app is at: android/app/build/outputs/apk/app-release.apk"
