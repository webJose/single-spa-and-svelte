# single-spa-and-svelte

> Experimental and demonstrative repository on how to use single-spa with a root project made with Svelte.

This repository is a "laboratory" that I developed myself while learning `single-spa` and how to use it with Svelte 
and other technologies.

This repository uses a Svelte root project, rejecting the recommendation from the `single-spa` developer team based 
on my reasoning and weighing the pros and cons of both the "purity" and "practicality" realms.  Long story short is, 
I'm unwilling to keep an extra root repository that is most likely to never change for anything other than adding or 
removing micro-frontends.  This impracticality, in my opinion, outweighs other arguments.  Feel free to disagree.

## Folder Structure

This is very simple:  Being this a `single-spa` experiment, the entire thing is composed by multiple projects.  Each 
one is either a micro-frontend project, or the root project.

### svelte-root

This folder contains the `single-spa` root project, which is based on **Vite + Svelte** for the reasons highlighted in 
the introduction above.

This projects mimics somewhat what I'll be needing in real life for my application at work.  You are free to browse 
the contents of this project, including the most complex component, the menu, but have in mind that my goal here is to 
make things work around the `single-spa` library, so certain areas may remain unexplored or incomplete.

> **DISCLAIMER**:  I borrowed from the web 2 very cool **Intel** logos for this demo project.  I do not hold copyright 
on them in any way, shape or form, and I will remove them if I am requested to do so.  While this project is licensed 
under the MIT license, these logos are not mine to license in the first place, and therefore they are **not** covered 
by this license.

