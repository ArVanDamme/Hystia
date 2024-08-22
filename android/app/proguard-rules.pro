# Configuration de base
-dontwarn **
-ignorewarnings
-keepattributes *Annotation*
-keepattributes Signature
-keepattributes InnerClasses
-keepattributes EnclosingMethod

# Optimisations
-optimizationpasses 5
-allowaccessmodification
-dontpreverify
-overloadaggressively

# Conserver les classes et méthodes critiques de React Native
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod <methods>;
}
-keep interface com.facebook.react.bridge.**
-keepclassmembers class * {
    native <methods>;
}
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider
-keep public class * extends android.view.View

# Optimiser les bibliothèques natives
-keepclassmembers class * {
    public <methods>;
}
-keep class com.mylibrary.** { *; }
-keepnames class com.mylibrary.**
-dontwarn com.mylibrary.internal.**
-assumenosideeffects class android.util.Log {
    public static int v(...);
    public static int i(...);
    public static int w(...);
    public static int d(...);
    public static int e(...);
}

# Activer l'obfuscation agressive
-repackageclasses
-dontskipnonpubliclibraryclasses

# Optimiser les ressources
-keep class **.R$* {
    <fields>;
}

# Optimisations supplémentaires
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-dontpreverify
-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*
