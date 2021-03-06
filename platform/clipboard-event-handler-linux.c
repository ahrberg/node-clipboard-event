// https://stackoverflow.com/a/44992967
// gcc -o xclipwatch xclipwatch.c -lX11 -lXfixes

#include <X11/extensions/Xfixes.h>
#include<stdio.h>
#include <assert.h>

void WatchSelection(Display *display, Window window, const char *bufname)
{
  int event_base, error_base;
  XEvent event;
  Atom bufid = XInternAtom(display, bufname, False);

  assert( XFixesQueryExtension(display, &event_base, &error_base) );
  XFixesSelectSelectionInput(display, DefaultRootWindow(display), bufid, XFixesSetSelectionOwnerNotifyMask);

  while (True)
  {
    XNextEvent(display, &event);

    if (event.type == event_base + XFixesSelectionNotify &&
        ((XFixesSelectionNotifyEvent*)&event)->selection == bufid)
    {
      printf("CLIPBOARD_CHANGE\n");
      fflush(stdout);
    }
  }
}

int main(){
  Display *display = XOpenDisplay(NULL);
  Window window = DefaultRootWindow(display);
  // WatchSelection(display,window,"PRIMARY");
  WatchSelection(display,window,"CLIPBOARD");
  XDestroyWindow(display, window);
  XCloseDisplay(display);
  return 0;
}
