// Uses polling via NSPasteboard::changeCount as there is no event notification.

#import <Cocoa/Cocoa.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSPasteboard*  pb  = [NSPasteboard generalPasteboard];
        
        long changeCount;
        long lastCount = [pb  changeCount];
        
        while(1) {
            [NSThread sleepForTimeInterval:0.2f];
            changeCount = [pb  changeCount];
            if(lastCount != changeCount) {
                lastCount = changeCount;
                printf("CLIPBOARD_CHANGE\n");
                fflush(stdout);
            }
        }
    }
    return 0;
}
