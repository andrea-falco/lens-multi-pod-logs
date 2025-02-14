# stern

Lens Multi Pod Logs extension uses [stern](https://github.com/stern/stern) `>= 1.30.0` under the hood, so it needs to be installed on your computer for the extension to work.

## Installation
Below you can find a quick guide on how to install `stern`, either manually or via a package manager.
> For more information visit the official [repository](https://github.com/stern/stern)

###  Manual

#### Linux/macOS
1. Download a [binary release](https://github.com/stern/stern/releases) for your OS
2. Create directory `${HOME}/bin` by running
	> `${HOME}` is also known as `~`
	```
	mkdir -p ${HOME}/bin
	```
3. Copy the downloaded binary in the directory
4. Make the binary executable by running
	```
	chmod 755 ${HOME}/bin/binary
	```
5. **Linux** specific step
  Open file  `${HOME}/.bashrc`  in a text editor *(if the file doesn’t exist, create it)*
6. **macOS** specific step
	Open your shell config file  in a text editor *(if the file doesn’t exist, create it)*
7. Add the below line to the shell config file, then save it:
	```
	export PATH="${HOME}/bin:${PATH}"
	```
8. **Restart** your terminal

#### Windows (CLI)
1. Download a [binary release](https://github.com/stern/stern/releases) for Windows
2. Create folder `C:\bin` by running:
	```
	mkdir C:\bin
	```
3. Copy the download binary in the directory
4. Edit the `PATH` for your account
	```
	setx PATH "C:\bin;%PATH%"
	```
6.  **Restart** your terminal

#### Windows (GUI)
1. Download a [binary release](https://github.com/stern/stern/releases) for Windows
2. Create folder `C:\bin`
3. Copy the download binary in the directory
4. Press the Windows key, then search for and select  **Edit the system environment variables**
5. Click  **Environment Variables**
6. Under  **System Variables**, find the `PATH` (or `Path`) variable, select it, and click  **Edit...**.
7. Add `C:\bin` folder to the variable
8. Click **OK** until you exit the tab

### Package Manager

####  asdf (Linux/macOS)
If you use [asdf](https://asdf-vm.com/), you can install like this:
```
asdf plugin-add stern
asdf install stern latest
```

####  Homebrew (Linux/macOS)
If you use [Homebrew](https://brew.sh), you can install like this:
```
brew install stern
```

####  Krew (Linux/macOS/Windows)
If you use [Krew](https://krew.sigs.k8s.io/) which is the package manager for kubectl plugins, you can install like this:
```
kubectl krew install stern
```
