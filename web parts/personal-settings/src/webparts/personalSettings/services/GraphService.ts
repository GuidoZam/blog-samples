import { MSGraphClientV3 } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ResponseType } from '@microsoft/microsoft-graph-client';
import { IGraphServiceResult, IDriveItem, ICreateFolderRequest } from './GraphInterfaces';

/**
 * Service for handling Microsoft Graph operations on the /me/drive/special/approot endpoint
 */
export class GraphService {
	private graphClient: MSGraphClientV3 | undefined;
	private context: WebPartContext;

	constructor(context: WebPartContext) {
		this.context = context;
	}

	/**
	 * Initialize the Graph client
	 */
	private async getGraphClient(): Promise<MSGraphClientV3> {
		if (!this.graphClient) {
			this.graphClient = await this.context.msGraphClientFactory.getClient("3");
		}
		return this.graphClient;
	}

	/**
	 * Create a new folder in the app root
	 * @param folderName - Name of the folder to create
	 * @param conflictBehavior - How to handle name conflicts
	 * @returns Promise with the created folder item
	 */
	public async createFolder(
		folderName: string,
		conflictBehavior: "rename" | "replace" | "fail" = "rename",
	): Promise<IGraphServiceResult<IDriveItem>> {
		try {
			const graphClient = await this.getGraphClient();
			const createFolderRequest: ICreateFolderRequest = {
				name: folderName,
				folder: {},
				"@microsoft.graph.conflictBehavior": conflictBehavior,
			};

			const response = await graphClient
				.api("/me/drive/special/approot/children")
				.version("v1.0")
				.post(createFolderRequest);

			return {
				success: true,
				data: response as IDriveItem,
			};
		} catch (error) {
			console.error(`Error creating folder ${folderName}:`, error);
			return {
				success: false,
				error:
					error instanceof Error ? error.message : "Unknown error occurred",
			};
		}
	}

	/**
	 * Upload a file to the app root folder (for small files < 4MB)
	 * @param fileName - Name of the file
	 * @param content - File content as string or ArrayBuffer
	 * @param contentType - MIME type of the file
	 * @param conflictBehavior - How to handle name conflicts
	 * @returns Promise with the uploaded file item
	 */
	public async uploadFile(
		fileName: string,
		content: string | ArrayBuffer,
		contentType: string = "application/octet-stream"
	): Promise<IGraphServiceResult<IDriveItem>> {
		try {
			const graphClient = await this.getGraphClient();

			const response = await graphClient
				.api(
					`/me/drive/special/approot:/${encodeURIComponent(fileName)}:/content`,
				)
				.version("v1.0")
				.header("Content-Type", contentType)
				.put(content);

			return {
				success: true,
				data: response as IDriveItem,
			};
		} catch (error) {
			console.error(`Error uploading file ${fileName}:`, error);
			return {
				success: false,
				error:
					error instanceof Error ? error.message : "Unknown error occurred",
			};
		}
	}

	/**
	 * Read and parse a JSON file from the app root folder
	 * @param fileName - Name of the JSON file
	 * @returns Promise with the parsed JSON data
	 */
	public async readJsonFile<T = any>(
		fileName: string,
	): Promise<IGraphServiceResult<T>> {
		try {
			const fileResult = await this.downloadFile(fileName);
			if (!fileResult.success || !fileResult.data) {
				return {
					success: false,
					error: fileResult.error || "Failed to download file",
				};
			}

			let jsonContent = fileResult.data;

			// Handle case where content might be an object already
			if (typeof jsonContent !== "string") {
				console.log(
					"Content is not a string, attempting to stringify:",
					typeof jsonContent,
				);
				jsonContent = JSON.stringify(jsonContent);
			}

			// Validate that we have actual JSON content
			if (!jsonContent.trim()) {
				return {
					success: false,
					error: "File is empty",
				};
			}

			const jsonData = JSON.parse(jsonContent) as T;
			return {
				success: true,
				data: jsonData,
			};
		} catch (error) {
			console.error(`Error reading JSON file ${fileName}:`, error);
			return {
				success: false,
				error: error instanceof Error ? error.message : "Invalid JSON format",
			};
		}
	}

	/**
	 * Download file content from the app root folder
	 * @param itemName - Name of the file to download
	 * @returns Promise with the file content as text
	 */
	private async downloadFile(
		itemName: string,
	): Promise<IGraphServiceResult<string>> {
		try {
			const graphClient = await this.getGraphClient();
			const response = await graphClient
				.api(
					`/me/drive/special/approot:/${encodeURIComponent(itemName)}:/content`,
				)
				.version("v1.0")
				.responseType(ResponseType.TEXT)
				.get();

			// Ensure we have a string response
			let content: string;
			if (typeof response === "string") {
				content = response;
			} else if (response instanceof ArrayBuffer) {
				content = new TextDecoder().decode(response);
			} else {
				// If response is an object, try to convert it to string
				content = JSON.stringify(response);
			}

			return {
				success: true,
				data: content,
			};
		} catch (error) {
			console.error(`Error downloading file ${itemName}:`, error);
			return {
				success: false,
				error:
					error instanceof Error ? error.message : "Unknown error occurred",
			};
		}
	}
}